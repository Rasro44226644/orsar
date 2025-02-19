
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import CodeSnippet from '@/components/CodeSnippet';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  createdAt: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: snippets = [], isLoading } = useQuery({
    queryKey: ['snippets'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/snippets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  const filteredSnippets = snippets.filter((snippet: Snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <CodeSnippet key={snippet.id} snippet={snippet} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-zinc-600 dark:text-zinc-400">No snippets found</p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100"
              onClick={() => console.log('Add new snippet')}
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
