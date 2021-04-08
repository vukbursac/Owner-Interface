using AutoMapper.QueryableExtensions;
using OwnerInterface.Interfaces;
using OwnerInterface.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace OwnerInterface.Repository
{
    public class UserRepository : IDisposable, IUserRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IQueryable<User> GetAll()
        {
            return db.UsersDB;
        }

        public User GetById(int id)
        {
            return db.UsersDB.Find(id);
        }
        public IQueryable<User> Toggle(int id)
        {
           var user =  db.UsersDB.Find(id);
            if (user.Paid == true)
            {
                user.Paid = false;
            } else
            {
                user.Paid = true;
            }
            db.Entry(user).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return GetAll();
        }

        public void Add(User korisnik)
        {
            db.UsersDB.Add(korisnik);
            db.SaveChanges();
        }

        public void Delete(User user)
        {
            db.UsersDB.Remove(user);
            db.SaveChanges();
        }

    }
}