﻿using System;
using System.Text;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Airline_Web_API.Helpers;
using Airline_Web_API.Models;

namespace Airline_Web_API.Services
{
    public class JwtService
    {
        private readonly AppSettings _appSettings;

        public JwtService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(CreateClaims(user)),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var accessToken = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(accessToken);

            return tokenString;
        }

        private IEnumerable<Claim> CreateClaims(User user)
        {
            var userIdClaim = new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString());
            var userRoleClaim = new Claim(ClaimTypes.Role, user.Role);

            return new[] { userIdClaim, userRoleClaim };
        }
    }
}