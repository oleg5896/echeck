package repository

import (
	"encoding/json"
	"github.com/go-redis/redis/v8"
	"server"
)

type ListObjectsRedis struct {
	db *redis.Client
}

func NewListObjectsRedis(db *redis.Client) *ListObjectsRedis {
	return &ListObjectsRedis{db: db}
}

func (r *ListObjectsRedis) Exists(key string) (int64, error) {
	//r.db.FlushDB(r.db.Context())
	return r.db.Exists(r.db.Context(), key).Result()
}

func (r *ListObjectsRedis) HGetAll(key string) (map[string]string, error) {
	return r.db.HGetAll(r.db.Context(), key).Result()
}

func (r *ListObjectsRedis) HmSet(key string, value server.Object) error {
	var inInterface map[string]string
	inrec, _ := json.Marshal(value)
	json.Unmarshal(inrec, &inInterface)
	if err := r.db.HMSet(r.db.Context(), key, inInterface).Err(); err != nil {
		return err
	}
	return nil
}
