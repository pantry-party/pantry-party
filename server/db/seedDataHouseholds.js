const client = require("../../../Unit04/PERN-Project/server/db/client")

//Households require a name and may contain a joinCode
const households = [
    {name: "User 1's Household"},
    {name: "User 2's Household"},
    {name: "User 3's Household"},
    {name: "User 4's Household"},
    {name: "The Party Household", joinCode: "cRrbGL"},
    {name: "An Especially Boring Household", joinCode: "ZL55vc"}
]

//join code generation functions by Derek Sivers. Article: https://sive.rs/rand1
async function joinCodeFns () {
    try {
        console.log('initializing household code generation')
        
        await client.query(`
            create function gen_random_bytes(int) returns bytea as
            '$libdir/pgcrypto', 'pg_random_bytes' language c strict;
        `)
        await client.query(`
            create function random_string(len int) returns text as $$
            declare
            chars text[] = '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
            result text = '';
            i int = 0;
            rand bytea;
            begin
            -- generate secure random bytes and convert them to a string of chars.
            rand = gen_random_bytes($1);
            for i in 0..len-1 loop
                -- rand indexing is zero-based, chars is 1-based.
                result = result || chars[1 + (get_byte(rand, i) % array_length(chars, 1))];
            end loop;
            return result;
            end;
            $$ language plpgsql;
        `)
        await client.query(`
            create function unique_random(len int, _table text, _col text) returns text as $$
            declare
            result text;
            numrows int;
            begin
            result = random_string(len);
            loop
                execute format('select 1 from %I where %I = %L', _table, _col, result);
                get diagnostics numrows = row_count;
                if numrows = 0 then
                return result; 
                end if;
                result = random_string(len);
            end loop;
            end;
            $$ language plpgsql;
        `)

        console.log('initialized household code generation')
    } catch (error) {
        throw error
    }
}

module.exports = { households, joinCodeFns }