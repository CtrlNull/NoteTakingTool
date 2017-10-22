using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Token
    {
        public int id { get; set; }
        public string service_name { get; set; }
        public string token { get; set; }
    }
}
