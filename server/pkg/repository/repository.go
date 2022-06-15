package repository

import (
	"github.com/go-redis/redis/v8"
	"server"
)

type ListObjects interface {
	Exists(key string) (int64, error)
	HmSet(key string, value server.Object) error
	HGetAll(key string) (map[string]string, error)
}

type Repository struct {
	ListObjects
}

func NewRepository(db *redis.Client) *Repository {
	return &Repository{
		ListObjects: NewListObjectsRedis(db),
	}
}
