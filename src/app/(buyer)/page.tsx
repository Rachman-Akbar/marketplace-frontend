import { BuyerHomeView } from "@/domains/catalog";
import { getHomepageData } from "@/domains/catalog/server";

export default async function BuyerHomePage() {
  const homepageData = await getHomepageData();

  return <BuyerHomeView data={homepageData} />;
}