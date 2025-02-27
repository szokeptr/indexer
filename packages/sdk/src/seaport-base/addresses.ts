import { ChainIdToAddress, Network } from "../utils";

export const OpenseaConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.EthereumGoerli]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Bsc]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Optimism]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Gnosis]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Polygon]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Arbitrum]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
  [Network.Avalanche]: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
};

export const ReservoirConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.EthereumGoerli]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Bsc]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Optimism]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Gnosis]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Polygon]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Arbitrum]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.Avalanche]: "0xf3d63166f0ca56c3c1a3508fce03ff0cf3fb691e000000000000000000000000",
  [Network.ScrollAlpha]: "0x7e727520b29773e7f23a8665649197aaf064cef1000000000000000000000000",
  [Network.MantleTestnet]: "0x7e727520b29773e7f23a8665649197aaf064cef1000000000000000000000000",
  [Network.LineaTestnet]: "0x7e727520b29773e7f23a8665649197aaf064cef1000000000000000000000000",
};

export const OriginConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0x52b868f7b0d20b689d059ab141677c673d5d2b7e000000000000000000000000",
  [Network.EthereumGoerli]: "0x52b868f7b0d20b689d059ab141677c673d5d2b7e000000000000000000000000",
  [Network.Polygon]: "0x52b868f7b0d20b689d059ab141677c673d5d2b7e000000000000000000000000",
};

export const SpaceIdConduitKey: ChainIdToAddress = {
  [Network.Ethereum]: "0x0e76a6dc9af8080b48c51e564e964cd15b9d6664000100000000000000000000",
};

export const ConduitController: ChainIdToAddress = {
  [Network.Ethereum]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.EthereumGoerli]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.EthereumSepolia]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Bsc]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Optimism]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Gnosis]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Polygon]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Arbitrum]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.Avalanche]: "0x00000000f9490004c11cef243f5400493c00ad63",
  [Network.ScrollAlpha]: "0x3070a7ea1bc31049068f055f9b31f5d2d7bdfb5d",
  [Network.MantleTestnet]: "0x9c390efb05e09982e23993ebfa3b32c190e25f4b",
  [Network.LineaTestnet]: "0xc04dd964ed36c0e4796f53a7168393ed4fc38ff6",
};

// https://github.com/ProjectOpenSea/seaport/blob/0a8e82ce7262b5ce0e67fa98a2131fd4c47c84e9/contracts/conduit/ConduitController.sol#L493
export const ConduitControllerCodeHash: ChainIdToAddress = {
  [Network.Ethereum]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.EthereumGoerli]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.EthereumSepolia]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Bsc]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Optimism]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Gnosis]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Polygon]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Arbitrum]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.Avalanche]: "0x023d904f2503c37127200ca07b976c3a53cc562623f67023115bf311f5805059",
  [Network.ScrollAlpha]: "0xfde822a5f8cca372c4a13e06a9a2baea0f8a45e42347603e34607fab3aacea4c",
  [Network.MantleTestnet]: "0xfde822a5f8cca372c4a13e06a9a2baea0f8a45e42347603e34607fab3aacea4c",
  [Network.LineaTestnet]: "0xfde822a5f8cca372c4a13e06a9a2baea0f8a45e42347603e34607fab3aacea4c",
};

export const OperatorFilterRegistry: ChainIdToAddress = {
  [Network.Ethereum]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.EthereumGoerli]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Bsc]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Optimism]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Gnosis]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Polygon]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Arbitrum]: "0x000000000000aaeb6d7670e522a718067333cd4e",
  [Network.Avalanche]: "0x000000000000aaeb6d7670e522a718067333cd4e",
};

// Zones

export const OpenSeaProtectedOffersZone: ChainIdToAddress = {
  [Network.Ethereum]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.EthereumGoerli]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.Bsc]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.Optimism]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.Gnosis]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.Polygon]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.Arbitrum]: "0x000000e7ec00e7b300774b00001314b8610022b8",
  [Network.Avalanche]: "0x000000e7ec00e7b300774b00001314b8610022b8",
};

// TODO: Deploy to all other supported networks
export const ReservoirCancellationZone: ChainIdToAddress = {
  [Network.Ethereum]: "0xaa0e012d35cf7d6ecb6c2bf861e71248501d3226",
  [Network.EthereumGoerli]: "0x49b91d1d7b9896d28d370b75b92c2c78c1ac984a",
};
