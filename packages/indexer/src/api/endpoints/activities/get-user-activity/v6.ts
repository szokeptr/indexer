/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from "lodash";
import { Request, RouteOptions } from "@hapi/hapi";
import Joi from "joi";
import { logger } from "@/common/logger";
import { buildContinuation, fromBuffer, regex, splitContinuation } from "@/common/utils";
import { ActivityType } from "@/models/activities/activities-entity";
import { UserActivities } from "@/models/user-activities";
import { getOrderSourceByOrderKind, OrderKind } from "@/orderbook/orders";
import { CollectionSets } from "@/models/collection-sets";
import * as Boom from "@hapi/boom";
import {
  getJoiActivityOrderObject,
  getJoiPriceObject,
  JoiActivityOrder,
  JoiPrice,
} from "@/common/joi";
import { ContractSets } from "@/models/contract-sets";

const version = "v6";

export const getUserActivityV6Options: RouteOptions = {
  description: "Users activity",
  notes:
    "This API can be used to build a feed for a user including sales, asks, transfers, mints, bids, cancelled bids, and cancelled asks types.",
  tags: ["api", "Activity"],
  plugins: {
    "hapi-swagger": {
      order: 1,
    },
  },
  validate: {
    query: Joi.object({
      users: Joi.alternatives()
        .try(
          Joi.array()
            .items(Joi.string().lowercase().pattern(regex.address))
            .min(1)
            .max(50)
            .description(
              "Array of users addresses. Max is 50. Example: `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63`"
            ),
          Joi.string()
            .lowercase()
            .pattern(regex.address)
            .description(
              "Array of users addresses. Max is 50. Example: `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63`"
            )
        )
        .required(),
      collection: Joi.alternatives(
        Joi.array().items(Joi.string().lowercase()),
        Joi.string().lowercase()
      ).description(
        "Filter to one or more collections. Example: `0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63`"
      ),
      collectionsSetId: Joi.string()
        .lowercase()
        .description("Filter to a particular collection set."),
      contractsSetId: Joi.string().lowercase().description("Filter to a particular contracts set."),
      community: Joi.string()
        .lowercase()
        .description("Filter to a particular community. Example: `artblocks`"),
      limit: Joi.number()
        .integer()
        .min(1)
        .default(20)
        .description(
          "Amount of items returned in response. If `includeMetadata=true` max limit is 20, otherwise max limit is 1,000."
        )
        .when("includeMetadata", {
          is: true,
          then: Joi.number().integer().max(20),
          otherwise: Joi.number().integer().max(1000),
        }),
      sortBy: Joi.string()
        .valid("eventTimestamp", "createdAt")
        .default("eventTimestamp")
        .description(
          "Order the items are returned in the response. The blockchain event time is `eventTimestamp`. The event time recorded is `createdAt`."
        ),
      includeMetadata: Joi.boolean()
        .default(true)
        .description("If true, metadata is included in the response."),
      continuation: Joi.string().description(
        "Use continuation token to request next offset of items."
      ),
      types: Joi.alternatives()
        .try(
          Joi.array().items(
            Joi.string()
              .lowercase()
              .valid(..._.values(ActivityType))
          ),
          Joi.string()
            .lowercase()
            .valid(..._.values(ActivityType))
        )
        .description("Types of events returned in response. Example: 'types=sale'"),
      displayCurrency: Joi.string()
        .lowercase()
        .pattern(regex.address)
        .description("Input any ERC20 address to return result in given currency."),
    }).oxor("collection", "collectionsSetId", "contractsSetId", "community"),
  },
  response: {
    schema: Joi.object({
      continuation: Joi.string().allow(null),
      activities: Joi.array().items(
        Joi.object({
          type: Joi.string(),
          fromAddress: Joi.string(),
          toAddress: Joi.string().allow(null),
          price: JoiPrice.allow(null),
          amount: Joi.number().unsafe(),
          timestamp: Joi.number(),
          contract: Joi.string()
            .lowercase()
            .pattern(/^0x[a-fA-F0-9]{40}$/)
            .allow(null),
          token: Joi.object({
            tokenId: Joi.string().allow(null),
            tokenName: Joi.string().allow("", null),
            tokenImage: Joi.string().allow("", null),
            lastBuy: {
              value: Joi.number().unsafe().allow(null),
              timestamp: Joi.number().unsafe().allow(null),
            },
            lastSell: {
              value: Joi.number().unsafe().allow(null),
              timestamp: Joi.number().unsafe().allow(null),
            },
            tokenRarityScore: Joi.number().allow(null),
            tokenRarityRank: Joi.number().allow(null),
            tokenMedia: Joi.string().allow(null),
          }),
          collection: Joi.object({
            collectionId: Joi.string().allow(null),
            collectionName: Joi.string().allow("", null),
            collectionImage: Joi.string().allow("", null),
          }),
          txHash: Joi.string().lowercase().pattern(regex.bytes32).allow(null),
          logIndex: Joi.number().allow(null),
          batchIndex: Joi.number().allow(null),
          order: JoiActivityOrder,
          createdAt: Joi.string(),
        })
      ),
    }).label(`getUserActivity${version.toUpperCase()}Response`),
    failAction: (_request, _h, error) => {
      logger.error(`get-user-activity-${version}-handler`, `Wrong response schema: ${error}`);
      throw error;
    },
  },
  handler: async (request: Request) => {
    const query = request.query as any;

    if (query.types && !_.isArray(query.types)) {
      query.types = [query.types];
    }

    if (!_.isArray(query.users)) {
      query.users = [query.users];
    }

    if (query.continuation) {
      query.continuation = splitContinuation(query.continuation)[0];
    }

    if (query.collectionsSetId) {
      query.collection = await CollectionSets.getCollectionsIds(query.collectionsSetId);
      if (_.isEmpty(query.collection)) {
        throw Boom.badRequest(`No collections for collection set ${query.collectionsSetId}`);
      }
    }

    if (query.contractsSetId) {
      query.contracts = await ContractSets.getContracts(query.contractsSetId);
      if (_.isEmpty(query.contracts)) {
        throw Boom.badRequest(`No contracts for contracts set ${query.contractsSetId}`);
      }
    }

    try {
      const activities = await UserActivities.getActivities(
        query.users,
        query.collection,
        query.community,
        query.continuation,
        query.types,
        query.limit,
        query.sortBy,
        query.includeMetadata,
        true,
        query.contracts
      );

      // If no activities found
      if (!activities.length) {
        return { activities: [] };
      }

      const result = [];

      for (const activity of activities) {
        result.push({
          type: activity.type,
          fromAddress: activity.fromAddress,
          toAddress: activity.toAddress,
          price: activity.order?.currency
            ? await getJoiPriceObject(
                {
                  gross: {
                    amount: String(activity.order?.currencyPrice ?? activity.price),
                    nativeAmount: String(activity.price),
                  },
                },
                fromBuffer(activity.order.currency),
                query.displayCurrency
              )
            : undefined,
          amount: activity.amount,
          timestamp: activity.eventTimestamp,
          createdAt: activity.createdAt.toISOString(),
          contract: activity.contract,
          token: activity.token,
          collection: activity.collection,
          txHash: activity.metadata.transactionHash,
          logIndex: activity.metadata.logIndex,
          batchIndex: activity.metadata.batchIndex,
          order: activity.order?.id
            ? await getJoiActivityOrderObject({
                id: activity.order.id,
                side: activity.order.side,
                sourceIdInt:
                  activity.order.sourceIdInt ||
                  (
                    await getOrderSourceByOrderKind(activity.order.kind! as OrderKind)
                  )?.id,
                criteria: activity.order.criteria,
              })
            : undefined,
        });
      }

      // Set the continuation node
      let continuation = null;
      if (activities.length === query.limit) {
        const lastActivity = _.last(activities);

        if (lastActivity) {
          const continuationValue =
            query.sortBy == "eventTimestamp"
              ? lastActivity.eventTimestamp
              : lastActivity.createdAt.toISOString();
          continuation = buildContinuation(`${continuationValue}`);
        }
      }

      return { activities: result, continuation };
    } catch (error) {
      logger.error(`get-user-activity-${version}-handler`, `Handler failure: ${error}`);
      throw error;
    }
  },
};
