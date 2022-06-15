package service

import (
	"server"
	"server/pkg/repository"
)

type ListObjects interface {
	Check(objects *map[string]server.Object) (map[string]int64, error)
	Set(key string, objects *server.Object) error
	Get(key string) (map[string]string, error)
}

type Service struct {
	ListObjects
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		ListObjects: NewListObjService(repos.ListObjects),
	}
}
