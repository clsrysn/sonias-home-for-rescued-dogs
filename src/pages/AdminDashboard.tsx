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
  EyeOff,
  PawPrint,
  Heart,
  Calendar
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
                <Users className="h-3 w-3 mr-1" />
                {dogs.length} Dogs
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
                <span className="ml-2 font-medium">{user?.email}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome Admin!
                </h2>
                <p className="text-slate-600">
                  Manage your furry friends and track their journey to forever homes
                </p>
              </div>
              <Link to="/admin/dogs/new">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Dog
                </Button>
              </Link>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="border-red-200 bg-red-50 text-red-800">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-slate-700">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <PawPrint className="h-5 w-5 text-blue-600" />
                  </div>
                  Total Dogs
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-blue-600">{dogs.length}</div>
                <p className="text-sm text-slate-500 mt-1">All dogs in database</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-slate-700">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  Available
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-green-600">
                  {dogs.filter(d => !d.adopted && !d.decreased).length}
                </div>
                <p className="text-sm text-slate-500 mt-1">Looking for homes</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-slate-700">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  Adopted
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-blue-600">
                  {dogs.filter(d => d.adopted).length}
                </div>
                <p className="text-sm text-slate-500 mt-1">Found forever homes</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-slate-700">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-gray-600" />
                  </div>
                  Decreased
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold text-gray-600">
                  {dogs.filter(d => d.decreased).length}
                </div>
                <p className="text-sm text-slate-500 mt-1">In loving memory</p>
              </CardContent>
            </Card>
          </div>

          {/* Dogs Table */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
              <CardTitle className="flex items-center text-slate-800">
                <Calendar className="h-5 w-5 mr-2 text-slate-600" />
                All Dogs Management
              </CardTitle>
              <CardDescription className="text-slate-600">
                Complete list of all dogs in your care
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 border-b">
                    <TableHead className="font-semibold text-slate-700">Name</TableHead>
                    <TableHead className="font-semibold text-slate-700">Age</TableHead>
                    <TableHead className="font-semibold text-slate-700">Category</TableHead>
                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                    <TableHead className="font-semibold text-slate-700">Gallery</TableHead>
                    <TableHead className="font-semibold text-slate-700">Created</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dogs.map((dog, index) => (
                    <TableRow 
                      key={dog.id} 
                      className="hover:bg-slate-50 transition-colors border-b"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <PawPrint className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-semibold text-slate-800">{dog.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={dog.category === 'Puppies' ? 'default' : 'secondary'} 
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                          {dog.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{dog.age}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            dog.decreased 
                              ? 'bg-black text-white border-0' 
                              : dog.adopted 
                                ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white border-0' 
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                          }`}
                        >
                          {dog.decreased ? (
                            <>
                              <Users className="h-3 w-3 mr-1" />
                              Decreased
                            </>
                          ) : dog.adopted ? (
                            <>
                              <Heart className="h-3 w-3 mr-1" />
                              Adopted
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3 mr-1" />
                              Available
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dog.galleryImages ? (
                          <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                            📁 {dog.galleryImages}
                          </Badge>
                        ) : (
                          <span className="text-slate-400 text-sm">No gallery</span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {dog.createdAt instanceof Date 
                          ? dog.createdAt.toLocaleDateString()
                          : dog.createdAt?.toDate?.().toLocaleDateString() || 'Unknown'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end space-x-2">
                          <Link to={`/admin/dogs/${dog.id}/edit`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete(dog.id!)}
                            disabled={deletingId === dog.id}
                            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
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
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PawPrint className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 mb-4">No dogs found in the database.</p>
                  <Link to="/admin/dogs/new">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Dog
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
