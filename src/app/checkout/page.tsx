'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CartItemDisplay } from '@/components/cart-item-display';
import { CheckoutForm } from '@/components/checkout-form';
import { ShoppingBag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart, getItemCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { toast } = useToast();

  const subtotal = getCartTotal();
  const itemCount = getItemCount();
  // Mock values for taxes and shipping
  const shippingCost = itemCount > 0 ? 15.00 : 0;
  const taxRate = 0.08; // 8%
  const taxes = subtotal * taxRate;
  const total = subtotal + shippingCost + taxes;

  const handlePlaceOrder = async (formData: any) => {
    setIsProcessing(true);
    // Simulate API call for payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your mock order has been confirmed.",
      action: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    });
  };

  if (orderPlaced) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <CheckCircle2 className="h-24 w-24 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Thank You for Your Order!</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Your mock order has been successfully placed. We appreciate your business!
            </p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">Checkout</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Review your items and complete your purchase.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
             <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any artwork yet.</p>
            <Button asChild>
              <Link href="/#gallery">Explore Gallery</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.map((item) => (
                    <CartItemDisplay key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>
              <div className="mt-8">
                 <CheckoutForm onSubmit={handlePlaceOrder} isProcessing={isProcessing} />
              </div>
            </div>

            <aside className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for larger screens */}
                <CardHeader>
                  <CardTitle>Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping (Mock)</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes (Mock 8%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                   <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Mock Payment</AlertTitle>
                    <AlertDescription>
                      This is a demonstration. No real payment will be processed.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                {/* CheckoutForm already includes the place order button */}
              </Card>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
