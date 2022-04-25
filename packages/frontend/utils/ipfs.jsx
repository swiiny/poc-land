import { Web3Storage } from 'web3.storage';

// be careful to not push tokens on the VCS! Old one was revoked
function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNEI5OWE0QTdiZTBBNzA3OEE0OGRDNjQwZEZjMjY3QzI2MDAxRjAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg3NzE1MDkzODYsIm5hbWUiOiJ4aXJ2YTIifQ.AW16Sau5kIPMk0ZlFuqpEalGzxWft0oVc6-UEgPIYb4';
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function createJsonFile(image, name, description) {
  const dict = { image, name, description };
  const dictstring = JSON.stringify(dict);
  return dictstring;
}

async function storeOnIPFS(files) {
  console.log('about to upload this file to IPFS: ', files);
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
}

function createMetadataFile(image, pocName, pocDescription) {
  const jsonMetadata = createJsonFile(image, pocName, pocDescription);
  const f = new File([jsonMetadata], 'metadata.json', { type: 'text/plain', lastModified: Date.now() });
  return f;
}

async function uploadPocDataToIPFS(files, pocName, pocDescription) {
  try {
    // step 0 : get the image (the first file)
    const pocImage = files[0];
    console.log('files, pocImage', files, pocImage);
    // step 1 : upload the image data to IPFS
    const cid = await storeOnIPFS(files);
    const client = makeStorageClient();
    const storedFiles = await client.get(cid);
    console.log('stored files');
    const sf = await storedFiles.files();
    console.log('stored files', sf);
    const storedCid = sf[0].cid;
    // step 2 : get the url of the image
    const imageUrl = `ipfs://${storedCid}`;
    console.log('image url', imageUrl);
    // step 3 : create opensea compatible image metadata file
    const f = createMetadataFile(imageUrl, pocName, pocDescription);
    // step 4 : upload the metadata file to IPFS
    const cid2 = await storeOnIPFS([f]);
    // step 5 : get the url of the metadata file
    const metadataUrl = `https://${cid2}.ipfs.dweb.link/${f.name}`;
    console.log('metadata url', metadataUrl);
    return metadataUrl;
  } catch (err) {
    console.error('uploadPocDataToIPFS', uploadPocDataToIPFS);
    return null;
  }
}

export { uploadPocDataToIPFS, getAccessToken };
