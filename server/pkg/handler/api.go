package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"server"
	"strconv"
	"time"
)

func (h *Handler) checkList(c *gin.Context) {

	var objectsResponse []ObjectResponse
	objects := map[string]server.Object{}

	if err := c.BindJSON(&objects); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	existsObj, err := h.services.Check(&objects)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	for key, value := range existsObj {
		obj := objects[key]
		if value == 0 {
			obj.Time = strconv.Itoa(int(time.Now().Unix()))
			fmt.Println(obj)
			if err := h.services.Set(key, &obj); err != nil {
				newErrorResponse(c, http.StatusBadRequest, err.Error())
				return
			}
		} else {
			objOld, err := h.services.Get(key)
			if err != nil {
				newErrorResponse(c, http.StatusBadRequest, err.Error())
				return
			}
			if changeObject := validate(&obj, objOld); changeObject != nil {
				obj.Time = strconv.Itoa(int(time.Now().Unix()))
				if err := h.services.Set(key, &obj); err != nil {
					newErrorResponse(c, http.StatusBadRequest, err.Error())
					return
				}
				objectsResponse = append(objectsResponse, *changeObject)
			}
		}
	}
	c.JSON(http.StatusOK, objectsResponse)
}

func validate(obj *server.Object, objOld map[string]string) *ObjectResponse {
	objectResponse := ObjectResponse{}

	if obj.Price != objOld["price"] {
		objectResponse.Price = objOld["price"]
	}
	if obj.Title != objOld["title"] {
		objectResponse.Title = objOld["title"]
	}
	if (ObjectResponse{}) == objectResponse {
		return nil
	}
	objectResponse.Id = objOld["nativeId"]
	objectResponse.Time = objOld["time"]
	return &objectResponse
}
