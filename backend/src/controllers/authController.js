import { query } from '../config/db.js';
import { comparePassword, hashPassword, signToken } from '../utils/auth.js';
import { validateUserInput } from '../utils/validation.js';
export async function register(req,res){
  const {name,email,password,address}=req.body; const errors=validateUserInput({name,email,password,address});
  if(Object.keys(errors).length) return res.status(400).json({message:'Validation failed.',errors});
  try { const existing=await query('SELECT id FROM users WHERE LOWER(email)=LOWER($1)',[email.trim()]); if(existing.rowCount) return res.status(409).json({message:'Email is already registered.'});
    const hash=await hashPassword(password); const r=await query(`INSERT INTO users(name,email,password_hash,address,role) VALUES($1,$2,$3,$4,'USER') RETURNING id,name,email,address,role`,[name.trim(),email.trim().toLowerCase(),hash,address.trim()]);
    const user=r.rows[0]; res.status(201).json({user,token:signToken(user)});
  } catch(e){res.status(500).json({message:'Unable to register user.'});}
}
export async function login(req,res){
  const {email,password}=req.body; if(!email||!password) return res.status(400).json({message:'Email and password are required.'});
  try { const r=await query('SELECT * FROM users WHERE LOWER(email)=LOWER($1)',[email.trim()]); if(!r.rowCount || !(await comparePassword(password,r.rows[0].password_hash))) return res.status(401).json({message:'Invalid email or password.'});
    const {id,name,address,role}=r.rows[0]; const user={id,name,email:r.rows[0].email,address,role}; res.json({user,token:signToken(user)});
  } catch(e){res.status(500).json({message:'Unable to login.'});}
}
