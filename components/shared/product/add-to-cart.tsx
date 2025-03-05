'use client';

import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
// import {useToast} from '@/hooks/use-toast';
// import {ToastAction} from '@/components/ui/toast';
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";


const AddToCart = ({ cart, item }: {cart?: Cart; item: CartItem})  => {
    const router = useRouter();
    // const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = async () => {
      startTransition(async () => {
        const res = await addItemToCart(item);

        if (!res.success){
            // toast({
            //     variant: 'destructive',
            //     description: res.message
            // });

            toast.error(res.message); // Changed to use toast.success (dot notation)
            return;
        }

        //Handle success add to cart

        
        // toast({
        //     description: `${item.name} added to cart`,
        //     action: (
        //       <ToastAction
        //         className='bg-primary text-white hover:bg-gray-800'
        //         altText='Go To Cart'
        //         onClick={() => router.push('/cart')}
        //       >
        //         Go To Cart
        //       </ToastAction>
        //     ),
        //   });

        //toast.success(`${item.name} added to cart`, { // Changed to use toast.success (dot notation)

        toast.success(res.message, { 
            action: {
              label: "Go to Cart",
              onClick: () => router.push("/cart"),
      
            },
      
          });

      })

        
    };

    //Handdle reomve from cart
    const handleRemoveFromCart = async () => {
      startTransition(async () => {
          const res = await removeItemFromCart(item.productId);
            // toast(res.success ? 'default' : 'destructive',{
            toast(res.message,{
            // description: res.message,
            action: {
              label: "Go to Cart",
                  onClick: () => router.push("/cart"),
            }
          
          });
        return;
      });
    };

    //Check if Item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId);

    return existItem ? (
      // <Button className="w-full" type="button" onClick={handleAddToCart}><Plus/> Add to cart</Button>  
      
        <div>
          <Button type="button" variant='outline' onClick={handleRemoveFromCart}>
            {/* <Minus className="h-4 w-4"/> */}
            { isPending ? (<Loader className="w-4 h-4 animate-spin"/>) : (<Minus className="h-4 w-4"/>)}
          </Button>
          <span className="px-2">
            {existItem.qty}
          </span>
          <Button type="button" variant='outline' onClick={handleAddToCart}>
            {/* <Plus className="h-4 w-4"/> */}
            { isPending ? (<Loader className="w-4 h-4 animate-spin"/>) : (<Plus className="h-4 w-4"/>)}
          </Button>
        </div>
      ) : (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
          { isPending ? (<Loader className="w-4 h-4 animate-spin"/>) : (<Plus className="h-4 w-4"/>)} 
          Add to cart
        </Button>  
      );
    
};
 
export default AddToCart;