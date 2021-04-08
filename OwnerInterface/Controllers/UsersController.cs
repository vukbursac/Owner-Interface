using AutoMapper;
using AutoMapper.QueryableExtensions;
using OwnerInterface.Interfaces;
using OwnerInterface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace OwnerInterface.Controllers
{
    public class UsersController : ApiController
    {
        IUserRepository repo { get; set; }
        

        public UsersController(IUserRepository repository)
        {
            repo = repository;
        }

        //GET api/users
        [ResponseType(typeof(UserDTO))]
        public IQueryable<UserDTO> GetAll()
        {
            return repo.GetAll().ProjectTo<UserDTO>();
        }

        //GET route api/users/{id}
        //[Authorize]
        [Route("api/toggle")]
        [ResponseType(typeof(User))]
        [HttpGet]
        public IHttpActionResult Toggle(int id)
        {
            var user = repo.Toggle(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        //GET route api/users/{id}
        //[Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetById(int id)
        {
            var user = repo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //POST api/users/
        //[Authorize]
        [ResponseType(typeof(User))]
        public IHttpActionResult Post(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            repo.Add(user);
            
            return CreatedAtRoute("DefaultApi", new { id = user.Id }, Mapper.Map<User>(user));
        }



        //DELETE api/users/{id}
        //[Authorize]
        [ResponseType(typeof(void))]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            var user = repo.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            repo.Delete(user);
            return CreatedAtRoute("DefaultApi", new { id = user.Id }, HttpStatusCode.NoContent);

        }
    }
}
