import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Store = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(10);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    const cartItem: CartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: product.node.title,
    });
  };

  if (loading) {
    return (
      <section id="store" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Store
            </h2>
            <p className="text-xl text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="store" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Store
            </h2>
            <p className="text-xl text-muted-foreground">No products found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="store" className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Merch Store
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Get your exclusive XO DRYFT merchandise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const { node } = product;
            const price = parseFloat(node.priceRange.minVariantPrice.amount);
            const images = node.images.edges;

            return (
              <Card key={node.id} className="overflow-hidden group hover:shadow-glow-primary transition-all duration-500 bg-card/80 backdrop-blur-md border-primary/20 hover:border-primary/50">
                <CardHeader className="p-0 relative">
                  {images.length > 1 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {images.map((image, idx) => (
                          <CarouselItem key={idx}>
                            <div className="aspect-square bg-gradient-to-br from-background to-primary/10">
                              <img
                                src={image.node.url}
                                alt={image.node.altText || node.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2 bg-background/90 border-primary/30 hover:bg-primary/20" />
                      <CarouselNext className="right-2 bg-background/90 border-primary/30 hover:bg-primary/20" />
                    </Carousel>
                  ) : images.length === 1 ? (
                    <div className="aspect-square bg-gradient-to-br from-background to-primary/10">
                      <img
                        src={images[0].node.url}
                        alt={images[0].node.altText || node.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-background to-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-16 w-16 text-primary/50" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6 bg-gradient-to-b from-card/50 to-background">
                  <CardTitle className="mb-2 text-foreground group-hover:text-primary transition-colors">{node.title}</CardTitle>
                  <CardDescription className="mb-4 text-foreground/70">
                    {node.description}
                  </CardDescription>
                  <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    ${price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 bg-gradient-to-b from-background to-card/30">
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    variant="hero"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Store;
