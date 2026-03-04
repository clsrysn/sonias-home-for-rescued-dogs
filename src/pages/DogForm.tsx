import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDog, updateDog, getDogById, Dog } from '@/firebase/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

interface DogFormData {
  name: string;
  age: string;
  description: string;
  image: string;
  adopted: boolean;
  decreased: boolean;
  category: string;
  backgroundStory: string;
  personality: string;
  medicalInformation: string;
  adoptionDetails: string;
  galleryImages: string;
}

const DogForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<DogFormData>({
    name: '',
    age: '',
    description: '',
    image: '',
    adopted: false,
    decreased: false,
    category: 'Adults',
    backgroundStory: '',
    personality: '',
    medicalInformation: '',
    adoptionDetails: '',
    galleryImages: ''
  });

  useEffect(() => {
    if (isEditing && id) {
      loadDog();
    }
  }, [id, isEditing]);

  const loadDog = async () => {
    try {
      setFetchLoading(true);
      const dog = await getDogById(id!);
      if (dog) {
        setFormData({
          name: dog.name,
          age: dog.age,
          description: dog.description,
          image: dog.image,
          adopted: dog.adopted,
          decreased: dog.decreased || false,
          category: dog.category,
          backgroundStory: dog.backgroundStory || '',
          personality: dog.personality || '',
          medicalInformation: dog.medicalInformation || '',
          adoptionDetails: dog.adoptionDetails || '',
          galleryImages: dog.galleryImages || ''
        });
      } else {
        setError('Dog not found');
      }
    } catch (error) {
      setError('Failed to load dog data');
      console.error('Error loading dog:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (field: keyof DogFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.age || !formData.description || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const dogData = {
        ...formData,
        age: formData.age.toString()
      };

      if (isEditing && id) {
        await updateDog(id, dogData);
        setSuccess('Dog updated successfully!');
      } else {
        await addDog(dogData);
        setSuccess('Dog created successfully!');
      }

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/admin');
      }, 1500);

    } catch (error) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} dog`);
      console.error('Error saving dog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-display">
              {isEditing ? 'Edit Dog' : 'Add New Dog'}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Dog Details' : 'Create New Dog'}</CardTitle>
              <CardDescription>
                {isEditing 
                  ? 'Update the information for this dog' 
                  : 'Add a new dog to the database'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error and Success Messages */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter dog's name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        placeholder="e.g., 2, [Adult], [Puppy]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of the dog"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image Path *</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="e.g., /dogs/dog-name.jpg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Puppies">Puppies</SelectItem>
                          <SelectItem value="Adults">Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="galleryImages">Gallery Folder Name</Label>
                      <Input
                        id="galleryImages"
                        value={formData.galleryImages}
                        onChange={(e) => handleInputChange('galleryImages', e.target.value)}
                        placeholder="e.g., kool (folder name in public/dogs/name)"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="adopted"
                      checked={formData.adopted}
                      onCheckedChange={(checked) => handleInputChange('adopted', checked)}
                    />
                    <Label htmlFor="adopted">Adopted</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="decreased"
                      checked={formData.decreased}
                      onCheckedChange={(checked) => handleInputChange('decreased', checked)}
                    />
                    <Label htmlFor="decreased">Decreased</Label>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Detailed Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backgroundStory">Background & Story</Label>
                    <Textarea
                      id="backgroundStory"
                      value={formData.backgroundStory}
                      onChange={(e) => handleInputChange('backgroundStory', e.target.value)}
                      placeholder="The dog's background story..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personality">Personality</Label>
                    <Textarea
                      id="personality"
                      value={formData.personality}
                      onChange={(e) => handleInputChange('personality', e.target.value)}
                      placeholder="Personality traits and behavior..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalInformation">Medical Information</Label>
                    <Textarea
                      id="medicalInformation"
                      value={formData.medicalInformation}
                      onChange={(e) => handleInputChange('medicalInformation', e.target.value)}
                      placeholder="Medical history, vaccinations, etc..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adoptionDetails">Adoption Details</Label>
                    <Textarea
                      id="adoptionDetails"
                      value={formData.adoptionDetails}
                      onChange={(e) => handleInputChange('adoptionDetails', e.target.value)}
                      placeholder="Adoption requirements, fees, process..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link to="/admin">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isEditing ? 'Update Dog' : 'Create Dog'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DogForm;
