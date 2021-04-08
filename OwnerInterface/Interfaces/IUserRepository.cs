using OwnerInterface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OwnerInterface.Interfaces
{
   public interface IUserRepository
    {
        IQueryable<User> GetAll();
       IQueryable<User> Toggle(int id);
        User GetById(int id);

        void Add(User user);
        void Delete(User user);
    }
}
