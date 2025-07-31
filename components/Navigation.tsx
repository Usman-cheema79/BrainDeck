'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Brain, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth");
  };

  return (
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient">BrainDeck</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                Contact
              </Link>

              {!user ? (
                  <>
                    <Link href="/auth">
                      <Button variant="outline" className="mr-2">Login</Button>
                    </Link>
                    <Link href="/auth">
                      <Button>Get Started</Button>
                    </Link>
                  </>
              ) : (
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
              )}
            </div>

            <div className="md:hidden">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {isOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm rounded-lg mt-2">
                  <Link href="#features" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                    Features
                  </Link>
                  <Link href="#about" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                    About
                  </Link>
                  <Link href="#contact" className="block px-3 py-2 text-foreground/80 hover:text-primary">
                    Contact
                  </Link>
                  <div className="flex space-x-2 px-3 py-2">
                    {!user ? (
                        <>
                          <Link href="/auth">
                            <Button variant="outline" size="sm">Login</Button>
                          </Link>
                          <Link href="/auth">
                            <Button size="sm">Get Started</Button>
                          </Link>
                        </>
                    ) : (
                        <Button variant="destructive" size="sm" onClick={handleLogout}>
                          Logout
                        </Button>
                    )}
                  </div>
                </div>
              </div>
          )}
        </div>
      </nav>
  );
}
