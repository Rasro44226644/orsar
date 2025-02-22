import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Book, GraduationCap, Heart, Globe, Star, Languages, Users, Target, Zap, Trophy, Brain, MessageCircle, Gamepad, Timer, Music, Video, Mic } from 'lucide-react';
import { toast } from "sonner";

const HAUSA_LESSONS = [
  {
    id: "1",
    title: "Greetings - Gaisuwa",
    content: "Sannu - Hello\nYaya kake/kike? - How are you?",
    level: "1",
    category: "Basic Phrases",
    xp: 20,
    requiredLevel: 1,
    hasAudio: true,
    hasVideo: true,
    features: ["pronunciation", "dialogue", "cultural-notes"]
  },
  {
    id: "2",
    title: "Numbers - Lambobi",
    content: "Daya - One\nBiyu - Two\nUku - Three",
    level: "1",
    category: "Numbers",
    xp: 15,
    requiredLevel: 1,
    hasAudio: true,
    features: ["practice", "quiz"]
  },
  {
    id: "3",
    title: "Colors - Kala",
    content: "Ja - Red\nBaki - Black\nFari - White",
    level: "2",
    category: "Colors",
    xp: 25,
    requiredLevel: 2,
    hasAudio: true,
    hasVideo: true,
    features: ["memory-game", "visual-aids"]
  }
];

const LEARNING_PATHS = [
  {
    id: "beginner",
    title: "Beginner's Journey",
    description: "Master the basics of Hausa",
    lessons: ["1", "2"],
    requiredXP: 0
  },
  {
    id: "intermediate",
    title: "Cultural Explorer",
    description: "Dive deeper into conversations",
    lessons: ["3"],
    requiredXP: 50
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [currentStreak, setCurrentStreak] = useState(5);

  const filteredLessons = HAUSA_LESSONS.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || lesson.category === selectedCategory)
  );

  const categories = ['all', ...new Set(HAUSA_LESSONS.map(lesson => lesson.category))];

  const startLesson = (lesson: any) => {
    if (userLevel < lesson.requiredLevel) {
      toast.error(`You need to reach level ${lesson.requiredLevel} to unlock this lesson!`);
      return;
    }
    toast.success(`Starting lesson: ${lesson.title}`);
  };

  const earnXP = (xp: number) => {
    setUserXP(prev => {
      const newXP = prev + xp;
      if (newXP >= userLevel * 100) {
        setUserLevel(prevLevel => prevLevel + 1);
        toast.success("Level Up! 🎉", {
          description: `You've reached level ${userLevel + 1}!`
        });
      }
      return newXP;
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 mb-4">
              <Globe className="h-8 w-8 text-white/80 animate-pulse" />
              <Languages className="h-8 w-8 text-white/80 animate-bounce" />
            </div>
            <h1 className="text-5xl font-bold text-gradient sm:text-6xl">
              Learn Hausa Language
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Master Hausa through immersive learning and cultural insights
            </p>
          </div>

          {/* User Progress Section */}
          <Card className="glass-card p-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <Target className="h-6 w-6 text-white/80" />
                  <span className="text-sm font-medium">Level {userLevel}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  <span className="text-sm font-medium">{userXP} XP</span>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="h-6 w-6 text-orange-500" />
                  <span className="text-sm font-medium">{currentStreak} Day Streak</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10"
                onClick={() => toast.success("View your detailed progress")}
              >
                <Star className="mr-2 h-4 w-4" />
                My Progress
              </Button>
            </div>
          </Card>

          {/* Learning Paths */}
          <div className="grid gap-6 md:grid-cols-2">
            {LEARNING_PATHS.map(path => (
              <Card 
                key={path.id}
                className="glass-card p-6 hover:bg-white/5 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {path.title}
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  {path.description}
                </p>
                <Button
                  className="w-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => toast.success(`Starting ${path.title}`)}
                  disabled={userXP < path.requiredXP}
                >
                  {userXP >= path.requiredXP ? 'Continue Learning' : `Unlock at ${path.requiredXP} XP`}
                </Button>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search lessons..."
                className="glass-input pl-10 w-full text-white placeholder:text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`capitalize ${
                    selectedCategory === category 
                      ? "bg-white/20 text-white" 
                      : "border-white/10 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <Card 
                key={lesson.id}
                className={`glass-card p-6 space-y-4 ${
                  userLevel >= lesson.requiredLevel
                    ? "hover:bg-white/5"
                    : "opacity-50"
                } transition-all duration-300`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                        Level {lesson.level}
                      </span>
                      {lesson.hasAudio && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">
                          <Mic className="h-3 w-3 inline" />
                        </span>
                      )}
                      {lesson.hasVideo && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 rounded-full">
                          <Video className="h-3 w-3 inline" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
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
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    {lesson.xp} XP
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success("Starting practice session!")}
                      className="border-purple-200 dark:border-purple-800"
                    >
                      <Gamepad className="h-4 w-4 mr-1" />
                      Practice
                    </Button>
                    <Button
                      onClick={() => startLesson(lesson)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                      size="sm"
                      disabled={userLevel < lesson.requiredLevel}
                    >
                      {userLevel < lesson.requiredLevel ? 'Locked' : 'Start'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="glass-card p-6 hover:bg-white/5 transition-all">
              <Users className="h-8 w-8 text-white/80 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Language Exchange</h3>
              <p className="text-sm text-white/70 mb-4">
                Practice with native Hausa speakers
              </p>
              <Button variant="outline" className="border-white/10 hover:bg-white/10" onClick={() => toast.success("Find language partners")}>
                Find Partners
              </Button>
            </Card>

            <Card className="glass-card p-6 hover:bg-white/5 transition-all">
              <Brain className="h-8 w-8 text-white/80 mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Practice</h3>
              <p className="text-sm text-white/70 mb-4">
                Get instant feedback on pronunciation
              </p>
              <Button variant="outline" className="border-white/10 hover:bg-white/10" onClick={() => toast.success("Start AI practice session")}>
                Practice Now
              </Button>
            </Card>

            <Card className="glass-card p-6 hover:bg-white/5 transition-all">
              <MessageCircle className="h-8 w-8 text-white/80 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Stories</h3>
              <p className="text-sm text-white/70 mb-4">
                Learn through shared experiences
              </p>
              <Button variant="outline" className="border-white/10 hover:bg-white/10" onClick={() => toast.success("Explore community stories")}>
                Explore Stories
              </Button>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="flex justify-center gap-4">
            <Button
              className="bg-white/10 hover:bg-white/20 text-white"
              onClick={() => toast.success("Starting your learning journey!")}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/10 text-white"
              onClick={() => toast.success("Download offline content!")}
            >
              <Book className="mr-2 h-5 w-5" />
              Download Lessons
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
