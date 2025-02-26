import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import sampleData from '@/db/sample-data';
import ProductList from "@/components/shared/product/product-list";
// const delay = (ms) => new Promise((resolve) => setTimeout (resolve, ms));

// const Homepage = async () => {
//   await delay(2000);
//   return (<>{APP_NAME}</>  );
//   // return (<Button>Button</Button>  );
// }


const Homepage = () => {
  // return (<>{APP_NAME}</>  );
  return (
    <>
      <ProductList 
        data = {sampleData.products} 
        title='Newest Arrivals' 
        limit={4}/>

    </>
  )
  // return (<Button>Button</Button>  );
}
 
export default Homepage;