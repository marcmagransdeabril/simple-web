// Private function - not exported
export const _fetchAccount = async (account) => {
    const response = await fetch(`https://www.example.com/deposits/${account}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
};

// Public function - exported
export const checkBalance = async (account) => {
    const response = await _fetchAccount(account);
    return response.amountCredits > response.amountDebits;  
};