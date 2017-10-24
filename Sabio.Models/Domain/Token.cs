using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Token
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public string token { get; set; }
    }
    public class TokenCreate
    {
        public string ServiceName { get; set; }
        public string Token { get; set; }
    }
    public class TokenUpdate
    {
        public string ServiceName { get; set; }
        public string Token { get; set; }
    }
    public class TokenDelete
    {
        public int Id { get; set; }
    }
}
