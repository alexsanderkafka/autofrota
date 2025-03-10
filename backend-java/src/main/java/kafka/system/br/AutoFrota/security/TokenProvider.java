package kafka.system.br.AutoFrota.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import kafka.system.br.AutoFrota.dto.TokenDTO;
import kafka.system.br.AutoFrota.exception.InvalidTokenException;
import kafka.system.br.AutoFrota.repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Base64;
import java.util.Date;

@Service
public class TokenProvider {
    @Value("${security.jwt.token.secret-key:secret}")
    private String secretKey = "secret";

    @Value("${security.jwt.token.expire-length:3600000}")
    private long validityInMilliSeconds = 3600000;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationRepository authenticationRepository;

    private Algorithm algorithm = null;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        algorithm = Algorithm.HMAC256(secretKey.getBytes());
    }

    public TokenDTO createAccessToken(String name, Long id){
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliSeconds);
        var accessToken = getAccessToken(name, now, validity);
        var refreshToken = getRefreshToken(name, now, validity);
        return new TokenDTO(id, name, true, now, validity, accessToken, refreshToken);
    }

    public TokenDTO refreshToken(String refreshToken){
        if(refreshToken.contains("Bearer ")) refreshToken = refreshToken.substring("Bearer ".length());

        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(refreshToken);

        String username = decodedJWT.getSubject();
        //List<String> roles = decodedJWT.getClaim("roles").asList(String.class);

        var business = authenticationRepository.findByBusinessEmail(username);

        if (business != null){
            return createAccessToken(username, business.getId());
        }else{
            throw new UsernameNotFoundException("Email " + username + " not found!");
        }
    }

    private String getRefreshToken(String username, Date now, Date validity) {
        String issuerUrl = ServletUriComponentsBuilder
                .fromCurrentContextPath().build().toUriString();

        return JWT.create()
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withSubject(username)
                .withIssuer(issuerUrl)
                .sign(algorithm)
                .strip();
    }

    private String getAccessToken(String username, Date now, Date validity) {
        Date validityRefreshToken = new Date(now.getTime() + (validityInMilliSeconds * 3));

        return JWT.create()
                .withIssuedAt(now)
                .withExpiresAt(validityRefreshToken)
                .withSubject(username)
                .sign(algorithm)
                .strip();
    }

    public Authentication getAuthentication(String token){
        DecodedJWT decodedJWT = decodedToken(token);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(decodedJWT.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private DecodedJWT decodedToken(String token) {
        Algorithm alg = Algorithm.HMAC256(secretKey.getBytes());
        JWTVerifier jwtVerifier = JWT.require(alg).build();

        return jwtVerifier.verify(token);
    }

    public String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");

        if(bearerToken != null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring("Bearer ".length());
        }
        return null;
    }

    public boolean validateToken(String token){
        DecodedJWT decodedJWT = decodedToken(token);

        try {
            if(decodedJWT.getExpiresAt().before(new Date())){
                return false;
            }
            return true;
        }
        catch (Exception e){
            throw new InvalidTokenException("Expire or invalid JWT token!");
        }
    }
}
