import moment from 'moment';

export const verifyAgeAutomatic = (date) => { 
   return moment().diff(moment(date, 'YYYY-MM-DD'), 'years');
};

export const verifyAgeManual = (date) => { 
    const today = new Date();
    const birthDate = new Date(date);
      
    const yearsDifference = today.getFullYear() - birthDate.getFullYear();
      
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        return yearsDifference - 1;
    }
      
    return yearsDifference;   
};
 