export const environment = {
  production: false,
  domain: 'http://localhost:3000',
  defaultImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAATIklEQVR4Xu2dCex2R1WHH5ZK2VS0VKVsClIUChYtiUFq2rIICgWCympRQVEjIBhRWyBAq2gEikYFQaREymawYABZKoIQE6ogQtUiKBSKWoqgRRYLxRw7H3n7tV/fudvcuTPPJP8A4cycM8+57++79547M9fCJgEJdEvgWt3O3IlLQAIoAF4EEuiYgALQcfKdugQUAK8BCXRMQAHoOPlOXQIKgNeABDomoAB0nHynLgEFwGtAAh0TUAA6Tr5Tl4AC4DUggY4JKAAdJ9+pS0AB8BqQQMcEFICOk+/UJaAAeA1IoGMCCkDHyXfqElAAvAYk0DEBBaDj5Dt1CSgAXgMS6JiAAtBx8p26BBQArwEJdExAAeg4+U5dAgqA14AEOiagAHScfKcuAQXAa0ACHRNQADpOvlOXgALgNSCBjgkoAB0n36lLQAHwGpBAxwQUgI6T79QloAB4DUigYwIKQMfJd+oSUAC8BiTQMQEFoOPkO3UJKABeAxLomIAC0HHynboEFACvAQl0TEAB6Dj5Tl0CCoDXgAQ6JqAAdJx8py4BBcBrQAIdE1AAOk6+U5eAAuA1IIGOCSgAHSffqUtAAfAakEDHBBSAjpPv1CWgAHgNSKBjAgpAx8l36hJQALwGJNAxAQWgr+QfDtwSuPHOXxC4dOfvQuALfWHpd7YKQLu5/1rg+9PfHYDbpx//tfdM+XIgROCfgPOBt6e//24XVb8zUwDayv3NgUcADwTuAlx3pul9CXgP8KfAy4CPzTSuw6xMQAFYOQEzuL8O8GDg0cAJQPzvJVvcIfwl8IfAK4EvL+nMsZcloAAsy3fJ0Q8DHgk8Gbjdko6uYewPAc8CXgpctlIMup1AQAGYAG/FrvcDngd864ox7Lr+V+DxwJ9VEo9hZBJQADJBVWJ26/TDv38l8RwcxuuSEHyk0vgM6yACCsB2LomHAc9P5buao46S4mOBs2sO0tiuIKAA1H8lXD/9q/+Y+kO9UoQvTHcDn99Y3F2FqwDUne6bAm8AvqfuMA8Z3d8A9wU+udH4mw9bAag3xfG8/6YV3/DPReaDwL0B3wvMRXTGcRSAGWHOONTRwF8AN5txzDWH+gRwInDBmkHo+6oEFID6roqjgHcBt6ovtEkRfRS4G3DRpFHsPCsBBWBWnJMHuwnwDuCOk0eqc4APAMcDn64zvP6iUgDqyXks0nkjcK96QlokkjcD9wHik2LbygQUgJUTsOP+VOD0esJZNJLTgDMW9eDgWQQUgCxMixvFbfG5M67eWzzgiQ5ideFJ6XFn4lB2n0JAAZhCb56+sUlHPBvfZp7hNjPKh9O7DjcfWTFlCsCK8JPrpwNPXT+MVSJ4BvC0VTzr9P8JKADrXgi3Bd4PxF1Ajy3+9T8GiGXFthUIKAArQN9x+XLgIeuGsLr3VwAPXT2KTgNQANZLfGzi8Q8FdvBZb4Z5nmNHoe8E4pNhW2ECCkBh4DvuXgKcsp77qjyfBTyqqog6CUYBWCfRRwIfB2JbL9sV24nFhqYXC6MsAQWgLO8D3mL7rDPXcV2t1yekfQ+qDbDFwBSAdbIa6+S/ex3X1Xr92w3ve1At1H2BKQD7CM3//8dS3zh0w3ZVAnF4iUuGC14ZCkBB2MnVzwO/Xd7tJjw+DvidTUTaSJAKQPlEviad3FPec/0e4+ShB9UfZjsRKgBlcxlLfi8BYt2/7aoEYp+AI1wqXO7SUADKsQ5PPv/v5+17gP2MZrNQAGZDmTXQycA5WZb9Gj0AeG2/0y87cwWgLO9fAn6jrMvNeYuzDn9zc1FvNGAFoGziXgT8ZFmXm/MWpw7HSce2AgQUgAKQd1zE7X88BtgOTSBu/+MxwFaAgAJQAPKOi9j2K/bHtx2aQJyHENuF2QoQUAAKQN5x8W7guLIuN+ftPOCum4t6owErAGUTF3v/3aGsy815O7/hcxGqS4YCUDYl3gHs5+0dwH5Gs1koALOhzBoonm9PyLLs1+htvicpl3wFoBzr8BRvuO9f1uXmvL3OSkm5nCkA5ViHp6hx/0RZl5vz9mK/lSiXMwWgHOvwFF+5Pausy815+2W/liyXMwWgHOvwFB+4xJJX26EJPND1EuUuDwWgHOvw9B1pK/CyXrflLbYI/8dthbzdaBWAsrm7DvAp4OvKut2Mt8+k/QDirABbAQIKQAHIB7mwEnBo5q4DKHw9KgCFgQOx/fVzy7vdhEe3Bi+cJgWgMPD0KXB8Emy7KgGf/wtfFQpAYeDJ3d8Bd17HdbVeg8mx1UbXaGAKwDqJfSLw7HVcV+v1ScBzqo2u0cAUgHUS+y3AhcB113FfndcvAbcA/r26yBoPSAFYL8F/DDx8PfdVeQ4Wj6wqok6CUQDWS3TsC/D3QJwV0HO7PK3/9+OfFa4CBWAF6DsuPSUI/gT44XXT0K93BWDd3EfZK95+H7ZuGKt5/99UDfGw1JVSoACsBH7HbZwTEOcF9NhiZeSv9DjxWuasAKyfiRumBUK3XD+UohFEFSQWR32uqFedXYmAAlDHBXFP4M87eiEYL/5+AHhLHfj7jUIBqCf3ZwC/Wk84i0bya8Cpi3pw8CwCCkAWpiJGsVQ4NsS8exFv6zn5q7Qxqkt+18vBVz0rABUkYSeEmwLvBG5XV1izRfNB4PuAT842ogNNIqAATMK3SOdbA+8CbrbI6OsN+gngbsBH1gtBzwcTUADqvCaOAeIMgSPqDG9wVJekvf7fP7inHRYloAAsinfS4EcDbwJuNWmU9Tt/FLg3cMH6oRiBdwDbugaOSuXBO24r7K9GGxufRLnvoo3G33zY3gHUn+IbAy8AHlp/qFeK8GzgscClG4u7q3AVgO2k+6eAM4HrVx5yfNn3uHQKUuWhGp4CsK1r4PbA71Z8eGZ82fdzwD9vC2u/0SoA28x9PA7ElmKxs1ANLUp8saXXK2oIxhjyCSgA+ayWtLwBcBLwVuDzmY7iUeAxwC+m7bQyu81q9jHgt4AXDoz7HsC5LgSaNRejBlMARmGbpVPsBHRy2hbsPkCIwHvS+YHxw8ptXwM8Ip2o+73A0jn9CvDX6Rk/tvKKNf25Lfb9Owe4S/rxvxF4WTo2PRYI2QoTWPpiKTydTbiLH/6PAKelMwIODvpi4MFAfDM/tN02iUEcsBmlw7m2G4sfZ5T04mDT+NF/aGhgaY1D7P5z5NX0PR84HXgVoBCMgDu2iwIwlty4fnEWwEuA79rT/TLg19OPIv77mBZfEZ4AHJ/EIF4gflPGHUL8C/8fQOzSEz/6d6RFSvE135gWux2F2MXGH/t2PordkR4FvG+MI/sMJ6AADGc2pkes9Hsy8DQgbtlzW/wgTkmbh+b2uSa7OJQ0viyMbwsO/IV91OoP/MWXe/81hzPgTsBZGYK36y4eKZ4OxE5JrhicKRGHGkYBWBgwcCOu2PgyPocd0+IHEfX/WEM/1w9zTBxD+oTQxN4GcdbfEMHb9RGfQcej0GeHONZ2GAEFYBivodaxvPf1wHFDO16NfdyCPwN4PjD2sWCGMK5xiLjFj6//njrTQqbzgB90+fByaVMAlmP7jWlZbyzqmbP9C/A84I8q+sw2Hid+HHg88G1zTjYtIoplxJ+aeVyHy3ghJKRxBOK2N2r6S+7uE48DLwL+AIiNNtZosXFJfKL8aCBu+5dqURGJbweGlByXiqWpcb0DWCad8eLrx5YZ+mpHjZeFr05ltDEluiGhRqkxyphxmMe+asaQcffZvjS9EN1n5/8/gIACMABWpulDgJdn2i5hFo8IUbqLrcXiX84QhLG19fiOIH7wcScTW3lFSXHuW/whDOITaD83HkJsj60CMCNM4OuBOOPum+cddtJoXwRCFD6cxCBeJsab9Sj7HXjDHpWKeI6P/4zvB+JHf5v0Y7/eJO/zdo7Tg+Msgc/MO2y/oykA8+b+94CfmXdIRzuIwO8DPyuVeQgoAPNwjFFiZV5seDm27j1fJG2PFC8CY+PUf2t7mmVmpwDMxzlq9E+ZbzhHugYCz0zfGghpIgEFYCLA1D2ek+Osu6tb6DKPB0fZJRALpuIsxXi/YZtAQAGYAG+nayy6iW28beUInJgWKZXz2KAnBWCepHr7Pw/HIaP4GDCE1iFsFYAZIKa6+5Jf/c0TZVujxDcO8V2CbQIBBWACvNQ1lvpGTb323Xqnz7SuEWLrtPh2wSXDE/KiAEyAl7p++4rf4k+PftsjxFoEdyCekEMFYAK81DX29Yt97mzlCTwg7SdY3nMjHhWA6YmMjS/OmD6MI4wgcGraKGVEV7sEAQVg+nUQm2Q+fPowjjCCQOwoHDsi20YSUABGgtvp9t7Cy2KnR9zOCLEM+th2plN+JgrANOZRAYgVdYdPG8beIwl8Ia1gtBIwEqACMBJc6mYFYBq/OXpbCZhAUQGYAC+d4hOHZdjWIxCHoFiFGclfARgJLnWzAjCN3xy9rQRMoKgATICXjsmyAjCN4dTeVgImEFQAJsADrABM4zdHbysBEygqAOPhWQEYz27OnlYCJtBUAMbDswIwnt3cPa0EjCSqAIwEZwVgPLgFeloJGAlVARgJLh1+6RqA8fzm7GklYCRNBWAkOCDePj9sfHd7zkjgbNdjjKOpAIzjFr2sAIxnN3dPKwEjiSoA48BZARjHbaleVgJGklUAxoGzAjCO25K9rASMoKsAjIBmBWActIV7WQkYAVgBGAHNCsA4aAv3shIwArACMAKaFYBx0BbuZSVgBGAFYAQ0KwDjoC3cy0rACMAKwHBoVgCGMyvRw0rACMoKwHBoVgCGMyvVw0rAQNIKwEBgVgCGAyvYw0rAQNgKwEBgQLxtPn14N3sUIHCaZzQMo6wADOMV1q4BGM6sVA8rAQNJKwADgQHxtvnOw7vZowCB93lGwzDKCsAwXlYAhvEqbW0lYCBxBWAYsHjLfMGwLloXJnC0pzXnE1cA8lmFZZxG6zkAw5iVtrYSMIC4AjAAlhWAYbBWsrYSMAC8AjAAlhWAYbBWsrYSMAC8AjAAlhWAYbBWsrYSMAC8ApAPywpAPqs1La0EDKCvAOTDsgKQz2ptSysBmRlQADJBWQHIB1WBpZWAzCQoAJmgrADkg6rA0kpAZhIUgExQVgDyQVVgaSUgMwkKQCYoKwD5oCqwtBKQmQQFIA+UFYA8TrVYWQnIzIQCkAfKCkAep5qsrARkZEMByIAExFvl1+SZalUJgQe5bmN/JhSA/YzCwl2A8jjVZGUlICMbCkAGJCsAeZAqs7ISkJEQBSADkhWAPEiVWVkJyEiIArAfkhWA/YxqtLASkJEVBWA/pFsAF+4306JCApG7j1cYVzUhKQD7U3EnIG4nbdsjcAzwge2FXS5iBWA/6+OBt+8306JCAncH3llhXNWEpADsT8XJwDn7zbSokMAPAa+vMK5qQlIA9qfiHsBb9ptpUSGBE4G3VRhXNSEpAPtT4UvA/Yxqtbg5cFGtwdUQlwKwPwvB6FLghvtNtaiIwP8AN6oonipDUQDy0vJu4Lg8U60qIXAecNdKYqk2DAUgLzVPBJ6dZ6pVJQSeBDynkliqDUMByEvNkemDksPyzLVamcBlQDz/X7xyHNW7VwDyUxTLgWNZsK1+AnF8WywHtu0hoADkXyKxKch7gRvkd9FyBQKfA471gNA88gpAHqcDVk8Anjusi9aFCfwCcGZhn5t1pwAMS921gTcDJw3rpnUhAucC9wIuL+Rv824UgOEpjO8B4tPg+ELQVg+Bt6bDW6L+b8skoABkgjrI7HrAK4FYJ2Bbn8BrgR8Fvrh+KNuKQAEYn6/YKOSngWcC3zB+GHtOIPCfwFOAFwBfnjBOt10VgOmpPwI4HTgFOHz6cI6QQSB2+zkLiI0/L8mw1+QQBBSA+S6N+O78vqn+fE/vCuYDm0aKf+1jVWZ8j/EG4LOze+hwQAVguaSHIByV/m4CyHoY668An06r+WJFnz/4YfyyrL0oszBpJIE2CSgAbebVWUkgi4ACkIVJIwm0SUABaDOvzkoCWQQUgCxMGkmgTQIKQJt5dVYSyCKgAGRh0kgCbRJQANrMq7OSQBYBBSALk0YSaJOAAtBmXp2VBLIIKABZmDSSQJsEFIA28+qsJJBFQAHIwqSRBNokoAC0mVdnJYEsAgpAFiaNJNAmAQWgzbw6KwlkEVAAsjBpJIE2CSgAbebVWUkgi4ACkIVJIwm0SUABaDOvzkoCWQQUgCxMGkmgTQIKQJt5dVYSyCKgAGRh0kgCbRJQANrMq7OSQBYBBSALk0YSaJOAAtBmXp2VBLIIKABZmDSSQJsEFIA28+qsJJBFQAHIwqSRBNokoAC0mVdnJYEsAgpAFiaNJNAmAQWgzbw6KwlkEVAAsjBpJIE2CSgAbebVWUkgi4ACkIVJIwm0SUABaDOvzkoCWQQUgCxMGkmgTQIKQJt5dVYSyCKgAGRh0kgCbRJQANrMq7OSQBYBBSALk0YSaJOAAtBmXp2VBLIIKABZmDSSQJsEFIA28+qsJJBFQAHIwqSRBNokoAC0mVdnJYEsAgpAFiaNJNAmAQWgzbw6KwlkEVAAsjBpJIE2CfwfrJzfEKqkGVEAAAAASUVORK5CYII='
};