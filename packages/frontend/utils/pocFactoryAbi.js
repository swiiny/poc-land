const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_maxPocAmount',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_baseURI',
        type: 'string',
      },
    ],
    name: 'createPoc',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export default abi;
