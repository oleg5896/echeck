package repository

import (
	"github.com/go-redis/redis/v8"
	"net"
	"strconv"
)

type Config struct {
	Host     string
	Port     string
	DB       string
	Password string
}

func NewRedisDB(cfg Config) (*redis.Client, *redis.StatusCmd) {
	db, _ := strconv.ParseInt(cfg.DB, 0, 8)
	rdb := redis.NewClient(&redis.Options{
		Addr:     net.JoinHostPort(cfg.Host, cfg.Port),
		Password: cfg.Password,
		DB:       int(db),
	})

	status := rdb.Ping(rdb.Context())

	return rdb, status
}
