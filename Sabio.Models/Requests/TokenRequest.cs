using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class TokenRequest
    {
        [Required]
        [MinLength(1), MaxLength(50)]
        public int id { get; set; }
        public string service_name { get; set; }
        public long token { get; set; }
    }
}
