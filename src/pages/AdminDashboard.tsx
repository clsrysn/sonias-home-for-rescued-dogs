import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllDogs, deleteDog, Dog } from '@/firebase/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Users, 
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    try {
      setLoading(true);
      const dogsData = await getAllDogs();
      setDogs(dogsData.sort((a, b) => {
        // Handle both Date and Firestore Timestamp objects
        const aTime = a.createdAt instanceof Date 
          ? a.createdAt.getTime() 
          : a.createdAt?.toDate?.().getTime() || 0;
        const bTime = b.createdAt instanceof Date 
          ? b.createdAt.getTime() 
          : b.createdAt?.toDate?.().getTime() || 0;
        return bTime - aTime;
      }));
    } catch (error) {
      setError('Failed to load dogs');
      console.error('Error loading dogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this dog? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteDog(id);
      setDogs(dogs.filter(dog => dog.id !== id));
    } catch (error) {
      setError('Failed to delete dog');
      console.error('Error deleting dog:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-display">Admin Dashboard</h1>
              <Badge variant="secondary">
                <Users className="h-3 w-3 mr-1" />
                {dogs.length} Dogs
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-display">Dog Management</h2>
              <p className="text-muted-foreground">
                Manage all dogs in the database
              </p>
            </div>
            <Link to="/admin/dogs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Dog
              </Button>
            </Link>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Dogs Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Dogs</CardTitle>
              <CardDescription>
                A list of all dogs in the database with their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Gallery</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dogs.map((dog) => (
                    <TableRow key={dog.id}>
                      <TableCell className="font-medium">{dog.name}</TableCell>
                      <TableCell>{dog.age}</TableCell>
                      <TableCell>
                        <Badge variant={dog.category === 'Puppies' ? 'default' : 'secondary'}>
                          {dog.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={dog.adopted ? 'default' : 'secondary'}>
                          {dog.adopted ? (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Adopted
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3 w-3 mr-1" />
                              Available
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dog.galleryImages ? (
                          <Badge variant="outline">{dog.galleryImages}</Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {dog.createdAt instanceof Date 
                          ? dog.createdAt.toLocaleDateString()
                          : dog.createdAt?.toDate?.().toLocaleDateString() || 'Unknown'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Link to={`/admin/dogs/${dog.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(dog.id!)}
                            disabled={deletingId === dog.id}
                          >
                            {deletingId === dog.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {dogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No dogs found in the database.</p>
                  <Link to="/admin/dogs/new" className="mt-4 inline-block">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Dog
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Total Dogs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dogs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dogs.filter(d => !d.adopted).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Adopted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dogs.filter(d => d.adopted).length}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
