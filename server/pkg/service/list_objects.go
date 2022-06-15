package service

import (
	"server"
	"server/pkg/repository"
)

type ListObjectsService struct {
	repo repository.ListObjects
}

func NewListObjService(repo repository.ListObjects) *ListObjectsService {
	return &ListObjectsService{repo: repo}
}

func (s *ListObjectsService) Check(objects *map[string]server.Object) (map[string]int64, error) {
	result := map[string]int64{}
	var err error
	for key := range *objects {
		result[key], err = s.repo.Exists(key)
	}
	return result, err
}

func (s *ListObjectsService) Set(key string, object *server.Object) error {
	return s.repo.HmSet(key, *object)
}

func (s *ListObjectsService) Get(key string) (map[string]string, error) {
	return s.repo.HGetAll(key)
}
