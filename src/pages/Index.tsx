
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Book, GraduationCap, Heart, Globe, Star, Languages } from 'lucide-react';
import { toast } from "sonner";

const HAUSA_LESSONS = [
  {
    id: "1",
    title: "Greetings - Gaisuwa",
    content: "Sannu - Hello\nYaya kake/kike? - How are you?",
    level: "Beginner",
    category: "Basic Phrases"
  },
  {
    id: "2",
    title: "Numbers - Lambobi",
    content: "Daya - One\nBiyu - Two\nUku - Three",
    level: "Beginner",
    category: "Numbers"
  },
  {
    id: "3",
    title: "Colors - Kala",
    content: "Ja - Red\nBaki - Black\nFari - White",
    level: "Beginner",
    category: "Colors"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLessons = HAUSA_LESSONS.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || lesson.category === selectedCategory)
  );

  const categories = ['all', ...new Set(HAUSA_LESSONS.map(lesson => lesson.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-purple-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 mb-4">
              <Globe className="h-8 w-8 text-purple-500 animate-pulse" />
              <Languages className="h-8 w-8 text-pink-500 animate-bounce" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent sm:text-6xl">
              Learn Hausa Language
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
              Explore the beautiful Hausa language through interactive lessons and exercises.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`capitalize ${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                    : "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search lessons..."
              className="pl-10 w-full bg-white/80 backdrop-blur-sm border-purple-100 dark:border-purple-900 dark:bg-zinc-800/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card 
                key={lesson.id}
                className="p-6 space-y-4 bg-white/80 backdrop-blur-sm dark:bg-zinc-800/80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                      {lesson.level}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {lesson.title}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toast.success("Lesson saved to favorites!")}
                    className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <pre className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-purple-900/50 rounded-lg overflow-x-auto">
                  <code className="text-sm whitespace-pre-wrap">{lesson.content}</code>
                </pre>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    {lesson.category}
                  </span>
                  <Button
                    onClick={() => toast.success("Starting practice session!")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                    size="sm"
                  >
                    Practice Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              onClick={() => toast.success("Starting a new lesson!")}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 dark:border-purple-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
              onClick={() => toast.success("Check out your progress!")}
            >
              <Star className="mr-2 h-5 w-5" />
              View Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
