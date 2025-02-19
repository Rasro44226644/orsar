
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import CodeSnippet from '@/components/CodeSnippet';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { toast } from "sonner";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: snippets = [], isLoading, error, refetch } = useQuery({
    queryKey: ['snippets'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3000/api/snippets');
        if (!response.ok) {
          throw new Error('Failed to fetch snippets');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching snippets:', error);
        return []; // Return empty array as fallback
      }
    },
  });

  const filteredSnippets = snippets.filter((snippet: Snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    // In a real app, this would make an API call
    // For now, we'll just show a success message
    toast.success('Snippet deleted successfully');
    refetch(); // Refresh the list
  };

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <Card className="p-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Snippets</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Don't worry! This is just a frontend demo. In a real application, this would connect to your backend.
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 rounded-full">
              Code Practice Haven
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              Your Personal Code Library
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Store, organize, and learn from your code snippets. Perfect for practice and reference.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search snippets..."
              className="pl-10 w-full bg-white dark:bg-zinc-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-6 space-y-4 animate-pulse">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                  <div className="h-20 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                </Card>
              ))
            ) : filteredSnippets.length > 0 ? (
              filteredSnippets.map((snippet: Snippet) => (
                <CodeSnippet 
                  key={snippet.id} 
                  snippet={snippet}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-zinc-600 dark:text-zinc-400">
                  {searchTerm ? "No snippets found matching your search" : "No snippets yet"}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              onClick={() => toast.success("This is a frontend-only demo. In a real app, this would open a form to add a new snippet.")}
            >
              Add New Snippet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
