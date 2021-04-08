using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OwnerInterface.Models
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string NameAndLastName { get; set; }
        public int YearOfBirth { get; set; }
        public bool Paid { get; set; }
    }
}