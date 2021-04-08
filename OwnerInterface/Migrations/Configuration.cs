namespace OwnerInterface.Migrations
{
    using OwnerInterface.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<OwnerInterface.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(OwnerInterface.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            context.UsersDB.AddOrUpdate(
                new User() { Id=1, NameAndLastName="Vuk Bursac", YearOfBirth=1999, Paid=true },
                new User() { Id = 2, NameAndLastName = "Ivana Jadranovic", YearOfBirth = 1999, Paid = true },
                new User() { Id = 3, NameAndLastName = "Markovic Ognjen", YearOfBirth = 2000, Paid = false },
                new User() { Id = 4, NameAndLastName = "Dragan Nikolic", YearOfBirth = 1970, Paid = false },
                new User() { Id = 5, NameAndLastName = "Pera Peric", YearOfBirth = 2003, Paid = true }

                );
            context.SaveChanges();
        }
    }
}
