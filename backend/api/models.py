from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    song_name = models.CharField(max_length=100)
    artist = models.TextField()
    album = models.TextField()
    length = models.TextField()
    album_image = models.URLField(max_length=500, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    
    def __str__(self):
        return self.song_name