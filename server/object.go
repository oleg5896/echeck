package server

type Object struct {
	NativeId string `json:"nativeId"`
	Source   string `json:"source"`
	Url      string `json:"url"`
	Title    string `json:"title"`
	Price    string `json:"price"`
	Time     string `json:"time"`
}
