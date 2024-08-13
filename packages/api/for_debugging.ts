import API from "@lib-apis";

function main() {
  const api = new API({
    productName: "CIVILNX",
    mapiKey: "aaa",
    baseUrl: "https://abc.com/civil",
  });
  const selfWeight = api.load.staticLoads.selfWeight;
  console.log(selfWeight.get());
}

main();
