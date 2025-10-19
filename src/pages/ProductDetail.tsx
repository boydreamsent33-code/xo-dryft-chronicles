import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storefrontApiRequest, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  if (!data?.data?.product) return null;
  
  return {
    node: data.data.product
  };
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.node.variants.edges[selectedVariantIndex].node;
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
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <p className="text-center text-xl text-foreground/80">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Product Not Found
            </h1>
            <Link to="/#store">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Store
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { node } = product;
  const selectedVariant = node.variants.edges[selectedVariantIndex].node;
  const price = parseFloat(selectedVariant.price.amount);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Link to="/#store" className="inline-flex items-center text-foreground/80 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Store
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {node.images.edges.length > 1 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {node.images.edges.map((image, idx) => (
                    <CarouselItem key={idx}>
                      <Card className="border-primary/20 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="aspect-square bg-gradient-to-br from-background to-primary/10">
                            <img
                              src={image.node.url}
                              alt={image.node.altText || node.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-background/90 border-primary/30 hover:bg-primary/20" />
                <CarouselNext className="right-4 bg-background/90 border-primary/30 hover:bg-primary/20" />
              </Carousel>
            ) : node.images.edges.length === 1 ? (
              <Card className="border-primary/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-background to-primary/10">
                    <img
                      src={node.images.edges[0].node.url}
                      alt={node.images.edges[0].node.altText || node.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-primary/20">
                <CardContent className="aspect-square flex items-center justify-center bg-gradient-to-br from-background to-primary/10">
                  <ShoppingCart className="h-24 w-24 text-primary/50" />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                {node.title}
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ${price.toFixed(2)} {selectedVariant.price.currencyCode}
              </p>
            </div>

            {node.description && (
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {node.description}
                </p>
              </div>
            )}

            {/* Variant Selection */}
            {node.variants.edges.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground/90">
                  Select Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {node.variants.edges.map((variant, index) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariantIndex === index ? "default" : "outline"}
                      onClick={() => setSelectedVariantIndex(index)}
                      disabled={!variant.node.availableForSale}
                      className="min-w-[100px]"
                    >
                      {variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full md:w-auto"
              disabled={!selectedVariant.availableForSale}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {selectedVariant.availableForSale ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
