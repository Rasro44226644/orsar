
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from 'lucide-react';
import { toast } from "sonner";

interface SnippetProps {
  snippet: {
    id: string;
    title: string;
    code: string;
    language: string;
    createdAt: string;
  };
}

const CodeSnippet = ({ snippet }: SnippetProps) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippet.code);
    toast.success('Copied to clipboard');
  };

  return (
    <Card className="p-6 space-y-4 bg-white dark:bg-zinc-800 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <span className="px-2 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-700 rounded">
            {snippet.language}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {snippet.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-700"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <pre className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-x-auto">
        <code className="text-sm font-mono">{snippet.code}</code>
      </pre>
      
      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        Added {new Date(snippet.createdAt).toLocaleDateString()}
      </div>
    </Card>
  );
};

export default CodeSnippet;
