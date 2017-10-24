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
        public int Id { get; set; }
        [Required]
        [MinLength(1), MaxLength(50)]
        public string ServiceName { get; set; }
        [Required]
        [MinLength(1), MaxLength(50)]
        public string Token { get; set; }
    }
    //public class TokenRequestCreate
    //{
    //    [Required]
    //    [MinLength(1), MaxLength(50)]
    //    public string service_name { get; set; }
    //    public string token { get; set; }
    //}

}
