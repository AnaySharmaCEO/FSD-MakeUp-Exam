import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../app/components/ui/card';
import { Input } from '../app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../app/components/ui/select';
import { Button } from '../app/components/ui/button';
import { Label } from '../app/components/ui/label';
import { addMovie } from '../features/movies/movieSlice';
import { GENRES, RATINGS } from '../utils/constants';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    genre: 'Drama',
    rating: 'PG-13',
    director: '',
    writer: '',
    imdbId: ''
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a movie title');
      return;
    }

    dispatch(addMovie(formData));
    toast.success('Movie added successfully!');
    navigate('/movies');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Add New Movie</h1>
        <p className="text-slate-400">Add a new movie to your collection</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Plus className="w-6 h-6" />
            Movie Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-slate-300">
                Movie Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter movie title"
                className="bg-slate-800 border-slate-700 text-white mt-2"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className="text-slate-300">
                  Release Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', parseInt(e.target.value))}
                  placeholder="2024"
                  min="1900"
                  max={new Date().getFullYear() + 5}
                  className="bg-slate-800 border-slate-700 text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="rating" className="text-slate-300">
                  Rating
                </Label>
                <Select value={formData.rating} onValueChange={(value) => handleChange('rating', value)}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RATINGS.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="genre" className="text-slate-300">
                Genre
              </Label>
              <Select value={formData.genre} onValueChange={(value) => handleChange('genre', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="director" className="text-slate-300">
                Director
              </Label>
              <Input
                id="director"
                value={formData.director}
                onChange={(e) => handleChange('director', e.target.value)}
                placeholder="Enter director name"
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="writer" className="text-slate-300">
                Writer
              </Label>
              <Input
                id="writer"
                value={formData.writer}
                onChange={(e) => handleChange('writer', e.target.value)}
                placeholder="Enter writer name"
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="imdbId" className="text-slate-300">
                IMDb ID (Optional)
              </Label>
              <Input
                id="imdbId"
                value={formData.imdbId}
                onChange={(e) => handleChange('imdbId', e.target.value)}
                placeholder="tt1234567"
                className="bg-slate-800 border-slate-700 text-white mt-2"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Movie
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/movies')}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
