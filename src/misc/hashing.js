const bcrypt = require('bcrypt')

// Hash password
async function hashPassword(password) {
    const hash = await bcrypt
        .hash(password, 10)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })

    return hash
}

// Validate hash
async function validateHash(hash, password) {
    
    const result = await bcrypt
        .compare(password, hash)
        .then(res => {
            return res
        })
        .catch(err => {
            return err.message
        })

    return result
}

module.exports = {
    hashPassword,
    validateHash
}