import React, { useState } from "react";
import Image from "next/image";
/* eslint-disable react/no-unescaped-entities */

import {
  ShoppingCart,
  Info,
  ImageIcon,
  CreditCard,
  Plus,
  Minus,
  X,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
}

interface GalleryProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

// Ethereal Background Animation Component
const EtherealBackground = () => {
  const circles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 5) % 100}%`,
    top: `${(i * 7) % 100}%`,
    width: `${100 + i * 10}px`,
    height: `${100 + i * 10}px`,
    delay: `${i * 0.2}s`,
    duration: `${2 + (i % 3)}s`,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-blue-900/30" />
      <div className="absolute inset-0">
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute animate-pulse rounded-full"
            style={{
              left: circle.left,
              top: circle.top,
              width: circle.width,
              height: circle.height,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              animation: `pulse ${circle.duration} infinite`,
              animationDelay: circle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Scrolling Banner Component
const ScrollingBanner = () => (
  <div className="bg-black/30 backdrop-blur-sm overflow-hidden py-2 px-4">
    <div className="whitespace-nowrap animate-scrollText inline-block">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-lg font-light tracking-wider">
        Now Serving Denver  Free Shipping on Orders Over $1500  30-Day
      </span>
    </div>
  </div>
);

// Gallery Component
const Gallery: React.FC<GalleryProps> = ({ products, addToCart }) => (
  <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
    {products.map((product) => (
      <div
        key={product.id}
        className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
      >
        <div className="aspect-video">
          <Image
            src={product.image}
            alt={product.name}
            width={500} // Replace with your desired width
            height={300} // Replace with your desired height
            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-light tracking-wider bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {product.name}
          </h3>
          <p className="mt-4 text-gray-300 text-lg">{product.description}</p>
          <div className="mt-6">
            <p className="font-bold text-purple-400 text-xl">
              ${product.price}
            </p>
            <p className="text-sm mt-2 text-gray-400">
              Available sizes: {product.sizes.join(", ")}
            </p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 font-light tracking-wider text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
);
export default function BedCanopyShop() {
  const [currentPage, setCurrentPage] = useState("gallery");
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [showCart, setShowCart] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Ethereal Dreams Canopy",
      price: 1599.99,
      description: "Where modern maximalism meets mystical elegance",
      image: "/etherealdreams.jpeg",
      sizes: ["Twin", "Queen", "King"],
    },
    {
      id: 2,
      name: "Celestial Haven",
      price: 1499.99,
      description:
        "A sanctuary inspired by cosmic energy and mountain serenity",
      image: "/celestialhaven.jpeg",
      sizes: ["Queen", "King"],
    },
    {
      id: 3,
      name: "Urban Mystic",
      price: 1299.99,

      description: "Modern spirituality meets urban edge",

      image: "/urbanmystic.jpeg",
      sizes: ["Twin", "Full", "Queen", "King"],
    },
  ];

  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    setShowCart(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <EtherealBackground />

      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-lg mb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300">
              Mystik Canopy
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => setCurrentPage("gallery")}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 text-white/90 transition-all duration-300"
              >
                <ImageIcon size={20} />
                <span className="font-light tracking-wider">Gallery</span>
              </button>
              <button
                onClick={() => setCurrentPage("about")}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 text-white/90 transition-all duration-300"
              >
                <Info size={20} />
                <span className="font-light tracking-wider">About</span>
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 text-white/90 transition-all duration-300"
              >
                <ShoppingCart size={20} />
                <span className="font-light tracking-wider">
                  Cart ({cart.length})
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <ScrollingBanner />

      {/* Main Content */}
      {currentPage === "gallery" && (
        <Gallery products={products} addToCart={addToCart} />
      )}

      {/* About */}
      {currentPage === "about" && (
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-4xl font-light tracking-wider text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            The Mystik Experience
          </h2>
          <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 text-gray-300">
            <p className="mb-6 font-light tracking-wide">
              We craft ethereal bed canopies that transform your sleeping space
              into a sanctuary of tranquility and style. Each piece is designed
              to blend contemporary aesthetics with mystical elements, creating
              an atmosphere that elevates both your space and spirit.
            </p>
            <p className="mb-6 font-light tracking-wide">
              Our designs draw inspiration from Colorado's mystical landscapes -
              from the enigmatic fog that embraces the Rockies to the celestial
              clarity of our starlit nights. Each canopy is crafted to bring
              this magical essence into your personal space.
            </p>
            <div className="mt-6 bg-white/10 border border-purple-400 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold">
                Experience the Magic in Person
              </h3>
              <p className="text-gray-300 mt-2">
                Visit our Denver showroom to see how our canopies transform
                spaces in real-time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-96 bg-black/80 backdrop-blur-lg transform ${
          showCart ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out text-white`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light tracking-wider bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Selection
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4 p-4 border border-white/20 rounded-lg backdrop-blur-md"
              >
                <div>
                  <h3 className="font-light tracking-wide">{item.name}</h3>
                  <p className="text-purple-400">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors duration-300 text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 ? (
            <div className="mt-4">
              <div className="flex justify-between mb-4">
                <span className="font-light tracking-wider">Total:</span>
                <span className="font-bold text-purple-400">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 font-light tracking-wider flex items-center justify-center space-x-2">
                <CreditCard size={20} />
                <span>Complete Your Journey</span>
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-400 font-light tracking-wider">
              Your cart awaits its first treasure
            </div>
          )}
        </div>
      </div>
    </div>
  );
}