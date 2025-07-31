'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Newspaper, Search, ExternalLink, Calendar, MapPin, DollarSign, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const scholarships = [
  {
    id: 1,
    title: 'HEC Need-Based Scholarship 2024',
    organization: 'Higher Education Commission',
    amount: 'Up to PKR 50,000',
    deadline: '2024-03-15',
    category: 'Need-Based',
    description: 'Financial assistance for deserving students from low-income families.',
    eligibility: 'Pakistani nationals, minimum 60% marks',
    link: '#'
  },
  {
    id: 2,
    title: 'PEEF Scholarship Program',
    organization: 'Punjab Educational Endowment Fund',
    amount: 'Full Tuition Coverage',
    deadline: '2024-02-28',
    category: 'Merit-Based',
    description: 'Merit-based scholarships for students in Punjab universities.',
    eligibility: 'Punjab domicile, minimum 70% marks',
    link: '#'
  },
  {
    id: 3,
    title: 'Ehsaas Undergraduate Scholarship',
    organization: 'Government of Pakistan',
    amount: 'PKR 100,000 per year',
    deadline: '2024-04-10',
    category: 'Need-Based',
    description: 'Supporting talented students from underprivileged backgrounds.',
    eligibility: 'Family income less than PKR 45,000/month',
    link: '#'
  }
];

const internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'TechCorp Pakistan',
    location: 'Lahore, Pakistan',
    duration: '3 months',
    stipend: 'PKR 25,000/month',
    deadline: '2024-02-20',
    type: 'Paid',
    description: 'Work on real-world projects using React, Node.js, and MongoDB.',
    requirements: 'Computer Science students, knowledge of JavaScript'
  },
  {
    id: 2,
    title: 'Marketing Intern',
    company: 'Digital Solutions Ltd',
    location: 'Karachi, Pakistan',
    duration: '6 months',
    stipend: 'PKR 20,000/month',
    deadline: '2024-03-05',
    type: 'Paid',
    description: 'Assist in digital marketing campaigns and social media management.',
    requirements: 'Business/Marketing students, creative mindset'
  },
  {
    id: 3,
    title: 'Research Assistant',
    company: 'LUMS University',
    location: 'Lahore, Pakistan',
    duration: '4 months',
    stipend: 'PKR 15,000/month',
    deadline: '2024-02-25',
    type: 'Academic',
    description: 'Support faculty research in artificial intelligence and machine learning.',
    requirements: 'CS/EE students, Python programming skills'
  }
];

const examUpdates = [
  {
    id: 1,
    title: 'MDCAT 2024 Registration Open',
    date: '2024-02-15',
    category: 'Medical',
    description: 'Medical and Dental College Admission Test registration has started.',
    deadline: '2024-03-20',
    fee: 'PKR 3,500'
  },
  {
    id: 2,
    title: 'ECAT 2024 Schedule Announced',
    date: '2024-02-10',
    category: 'Engineering',
    description: 'Engineering College Admission Test will be held in May 2024.',
    deadline: '2024-04-15',
    fee: 'PKR 3,000'
  },
  {
    id: 3,
    title: 'CSS 2024 Written Exam Results',
    date: '2024-02-12',
    category: 'Civil Service',
    description: 'Central Superior Services written examination results declared.',
    deadline: 'N/A',
    fee: 'N/A'
  }
];

const opportunities = [
  {
    id: 1,
    title: 'Youth Leadership Summit 2024',
    organizer: 'Pakistan Youth Council',
    date: '2024-03-25',
    location: 'Islamabad',
    type: 'Conference',
    description: 'A platform for young leaders to network and learn leadership skills.',
    registration: 'Free'
  },
  {
    id: 2,
    title: 'Startup Weekend Lahore',
    organizer: 'Techstars',
    date: '2024-04-05',
    location: 'Lahore',
    type: 'Competition',
    description: '54-hour event to build a startup from idea to pitch.',
    registration: 'PKR 2,000'
  },
  {
    id: 3,
    title: 'AI Workshop Series',
    organizer: 'FAST University',
    date: '2024-03-15',
    location: 'Online',
    type: 'Workshop',
    description: 'Learn artificial intelligence and machine learning fundamentals.',
    registration: 'PKR 1,500'
  }
];

export default function CampusBuzzPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('scholarships');

  const filterItems = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Campus Buzz</h1>
              <p className="text-muted-foreground">Latest updates on scholarships, internships, and opportunities</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterItems(scholarships, searchTerm).map((scholarship) => (
                <Card key={scholarship.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{scholarship.title}</CardTitle>
                        <CardDescription className="mt-1">{scholarship.organization}</CardDescription>
                      </div>
                      <Badge variant={scholarship.category === 'Merit-Based' ? 'default' : 'secondary'}>
                        {scholarship.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {scholarship.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-3">
                        <strong>Eligibility:</strong> {scholarship.eligibility}
                      </p>
                      <Button className="w-full" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterItems(internships, searchTerm).map((internship) => (
                <Card key={internship.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{internship.title}</CardTitle>
                        <CardDescription className="mt-1">{internship.company}</CardDescription>
                      </div>
                      <Badge variant={internship.type === 'Paid' ? 'default' : 'secondary'}>
                        {internship.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {internship.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{internship.stipend}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-3">
                        <strong>Requirements:</strong> {internship.requirements}
                      </p>
                      <Button className="w-full" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterItems(examUpdates, searchTerm).map((exam) => (
                <Card key={exam.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{exam.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {new Date(exam.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge>{exam.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {exam.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      {exam.deadline !== 'N/A' && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          <span>Deadline: {new Date(exam.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                      {exam.fee !== 'N/A' && (
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span>Fee: {exam.fee}</span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterItems(opportunities, searchTerm).map((opportunity) => (
                <Card key={opportunity.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{opportunity.title}</CardTitle>
                        <CardDescription className="mt-1">{opportunity.organizer}</CardDescription>
                      </div>
                      <Badge variant="outline">{opportunity.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {opportunity.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-purple-500" />
                        <span>{opportunity.registration}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}