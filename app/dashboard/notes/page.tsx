'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Plus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import Link from 'next/link';

const sampleNotes = [
  {
    id: 1,
    title: 'Photosynthesis Process',
    subject: 'Biology',
    content: `# Photosynthesis

## Definition
Photosynthesis is the process by which plants convert light energy into chemical energy.

## Equation
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

## Key Points
- Occurs in chloroplasts
- Two main stages: Light-dependent and Light-independent reactions
- Produces glucose and oxygen
- Essential for life on Earth

## Light-Dependent Reactions
- Occur in thylakoids
- Chlorophyll absorbs light
- Water is split (photolysis)
- ATP and NADPH are produced

## Calvin Cycle (Light-Independent)
- Occurs in stroma
- CO₂ is fixed into glucose
- Uses ATP and NADPH from light reactions`,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-16',
    tags: ['process', 'plants', 'energy']
  },
  {
    id: 2,
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    content: `# Newton's Laws of Motion

## First Law (Law of Inertia)
An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.

## Second Law
F = ma
Force equals mass times acceleration

## Third Law
For every action, there is an equal and opposite reaction.

## Applications
- Car safety (seatbelts, airbags)
- Rocket propulsion
- Walking and running
- Sports activities`,
    createdAt: '2024-02-14',
    updatedAt: '2024-02-14',
    tags: ['laws', 'motion', 'force']
  },
  {
    id: 3,
    title: 'Calculus Derivatives',
    subject: 'Mathematics',
    content: `# Derivatives in Calculus

## Definition
The derivative of a function represents the rate of change at any point.

## Basic Rules
- Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹
- Product Rule: d/dx(uv) = u'v + uv'
- Chain Rule: d/dx(f(g(x))) = f'(g(x))·g'(x)

## Common Derivatives
- d/dx(sin x) = cos x
- d/dx(cos x) = -sin x
- d/dx(eˣ) = eˣ
- d/dx(ln x) = 1/x

## Applications
- Finding slopes of curves
- Optimization problems
- Physics (velocity, acceleration)`,
    createdAt: '2024-02-13',
    updatedAt: '2024-02-15',
    tags: ['calculus', 'derivatives', 'math']
  }
];

export default function NotesPage() {
  const [notes, setNotes] = useState(sampleNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    subject: '',
    content: '',
    tags: ''
  });

  const subjects = Array.from(new Set(notes.map(note => note.subject)));


  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleCreateNote = () => {
    if (newNote.title && newNote.subject && newNote.content) {
      const note = {
        id: notes.length + 1,
        ...newNote,
        tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', subject: '', content: '', tags: '' });
      setShowCreateForm(false);
    }
  };

  const handleUpdateNote = (id: number, updatedNote: any) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { 
            ...note, 
            ...updatedNote, 
            tags: typeof updatedNote.tags === 'string' 
              ? updatedNote.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
              : updatedNote.tags,
            updatedAt: new Date().toISOString().split('T')[0] 
          }
        : note
    ));
    setEditingNote(null);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const EditNoteForm = ({ note, onSave, onCancel }: any) => {
    const [editData, setEditData] = useState({
      title: note.title,
      subject: note.subject,
      content: note.content,
      tags: note.tags.join(', ')
    });

    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Edit Note</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" onClick={() => onSave(editData)}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={editData.subject}
                onChange={(e) => setEditData({...editData, subject: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (comma-separated)</label>
            <Input
              value={editData.tags}
              onChange={(e) => setEditData({...editData, tags: e.target.value})}
              placeholder="e.g., biology, photosynthesis, plants"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={editData.content}
              onChange={(e) => setEditData({...editData, content: e.target.value})}
              rows={15}
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>
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
              <h1 className="text-3xl font-bold">Notes & Materials</h1>
              <p className="text-muted-foreground">Create, edit, and organize your study notes</p>
            </div>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Create Note Form */}
        {showCreateForm && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Create New Note</CardTitle>
              <CardDescription>Add a new study note to your collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="e.g., Photosynthesis Process"
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="e.g., Biology, Physics, Math"
                    value={newNote.subject}
                    onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  placeholder="e.g., biology, photosynthesis, plants"
                  value={newNote.tags}
                  onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Write your notes here... You can use Markdown formatting."
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateNote}>Create Note</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes List */}
        <div className="space-y-6">
          {filteredNotes.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedSubject !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first note to start organizing your study materials'
                  }
                </p>
                {!searchTerm && selectedSubject === 'all' && (
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Note
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id}>
                {editingNote === note.id ? (
                  <EditNoteForm
                    note={note}
                    onSave={(updatedNote: any) => handleUpdateNote(note.id, updatedNote)}
                    onCancel={() => setEditingNote(null)}
                  />
                ) : (
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-xl">{note.title}</CardTitle>
                            <Badge>{note.subject}</Badge>
                          </div>
                          <CardDescription>
                            Created: {new Date(note.createdAt).toLocaleDateString()} • 
                            Updated: {new Date(note.updatedAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNote(note.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none mb-4">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {note.content}
                        </pre>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {note.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}