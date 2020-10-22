using System;
using System.Net;

namespace Airline_Web_API.Helpers
{
    [Serializable]
    public class Response<T>
    {
        public bool Success { get; set; } = true;
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
