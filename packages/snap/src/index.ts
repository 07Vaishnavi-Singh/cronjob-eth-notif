import { OnRpcRequestHandler } from '@metamask/snap-types';

async function getPrice() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'); 
  return response.text(); 
}

export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inApp',
            message: 'from RPC',
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'cronjobMethod':
      return getPrice().then( cronjobMethod => {
        const priceObject = JSON.parse(cronjobMethod);
        const price = parseFloat(priceObject.ethereum.usd);
        return wallet.request({
          method: 'snap_notify',
          params: [
            {
              type: 'inApp',
              message: `Current ETH Price ${price}`,
            },
          ],
        });
      });


    default:
      throw new Error('Method not found.');
  }
};
