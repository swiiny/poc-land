import { Web3Storage } from 'web3.storage';

// be careful to not push tokens on the VCS! Old one was revoked
function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNEI5OWE0QTdiZTBBNzA3OEE0OGRDNjQwZEZjMjY3QzI2MDAxRjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg3NzE1MDkzODYsIm5hbWUiOiJ4aXJ2YTIifQ.AW16Sau5kIPMk0ZlFuqpEalGzxWft0oVc6-UEgPIYb4';
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeFiles(file) {
  const client = makeStorageClient();
  console.log('client', client);
  console.log('file', file);
  const cid = await client.put(file);
  return cid;
}

export { storeFiles, getAccessToken };
