using System;

namespace Airline_Web_API.Helpers
{
    public class Response<T>
    {
        public string Message { get; set; }
        public int Status { get; set; }
        public T Data { get; set; }
    }
}
