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
    <section id="store" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Merch Store
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your exclusive XO DRYFT merchandise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const { node } = product;
            const price = parseFloat(node.priceRange.minVariantPrice.amount);
            const images = node.images.edges;

            return (
              <Card key={node.id} className="overflow-hidden hover:shadow-glow-primary transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-0">
                  {images.length > 1 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {images.map((image, idx) => (
                          <CarouselItem key={idx}>
                            <div className="aspect-square">
                              <img
                                src={image.node.url}
                                alt={image.node.altText || node.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  ) : images.length === 1 ? (
                    <div className="aspect-square">
                      <img
                        src={images[0].node.url}
                        alt={images[0].node.altText || node.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{node.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {node.description}
                  </CardDescription>
                  <p className="text-2xl font-bold text-primary">
                    ${price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
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
